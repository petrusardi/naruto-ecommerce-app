const { User, Figure, Order } = require("../models");
const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const axios = require("axios");
const openAI = require("../helpers/openai");
const { where } = require("sequelize");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class Controller {
  static async addUser(req, res, next) {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ email: user.email, role: user.role });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "validation errors" };
      if (!password) throw { name: "validation errors" };

      const user = await User.findOne({ where: { email } });
      if (!user)
        throw { name: "Error login user not found atau password not matched" };

      const result = comparePass(password, user.password);
      if (!result)
        throw { name: "Error login user not found atau password not matched" };
      const access_token = createToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
  static async getCharacter(req, res, next) {
    try {
      let { search, page } = req.query;
      let response = {};
      let data = [];
      if (search) {
        let responseOpenAI = await openAI(search);
        response = await axios.get(
          `https://narutodb.xyz/api/character/search?name=${responseOpenAI}`
        );
        data = [response.data];
      } else {
        if (!Number(page)) {
          page = 1;
        }
        let limit = 15;
        let queryOption = {
          limit: limit,
          offset: (page - 1) * limit,
        };
        response = await axios.get(
          `https://narutodb.xyz/api/character?page=${page}&limit=${limit}`
        );
        data = response.data.characters;
      }
      res.status(200).json(data);
      // res.send('test')
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getFig(req, res, next) {
    try {
      const figure = await Figure.findAll();
      if (figure.length === 0) {
        throw { name: "error not found" };
      } else {
        res.status(200).json(figure);
      }
    } catch (error) {
      next(error);
    }
  }
  static async getDetailFig(req, res, next) {
    try {
      let { id } = req.params;
      const figure = await Figure.findByPk(id);
      if (figure.length === 0) {
        throw { name: "error not found" };
      } else {
        res.status(200).json(figure);
      }
    } catch (error) {
      next(error);
    }
  }
  static async postFig(req, res, next) {
    try {
      const { title, UserId, imageUrl, price } = req.body;
      const figure = await Figure.create({ title, UserId, imageUrl, price });
      if (!figure) {
        throw { name: "validation errors" };
      } else {
        res.status(201).json(figure);
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateFig(req, res, next) {
    try {
      const figureId = +req.params.id;
      const figure = await Figure.findByPk(figureId);
      if (!figure) {
        throw { name: "error not found" };
      }
      await figure.update(req.body);
      res.status(200).json(figure);
    } catch (error) {
      next(error);
    }
  }
  static async deleteFig(req, res, next) {
    try {
      const figureId = +req.params.id;
      const figure = await Figure.findByPk(figureId);
      if (!figure) {
        throw { name: "error not found" };
      }
      await figure.destroy();
      res
        .status(200)
        .json({ message: `Figure id ${figureId} success to delete` });
    } catch (error) {
      next(error);
    }
  }
  static async getOrder(req, res, next) {
    try {
      let data = req.user.id;
      let { FigureId } = req.params;
      let figure = await Figure.findByPk(FigureId);
      console.log(figure.dataValues.price);
      let order = await Order.create({
        UserId: data,
        FigureId,
        totalPrice: figure.dataValues.price,
      });
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
  static async getAllOrder(req, res, next) {
    try {
      const order = await Order.findAll();
      if (order.length === 0) {
        throw { name: "error not found" };
      } else {
        res.status(200).json(order);
      }
    } catch (error) {
      next(error);
    }
  }
  static async deleteOrder(req, res, next) {
    try {
      const deleteId = +req.params.id;
      const order = await Order.findByPk(deleteId);
      console.log(order);
      if (!deleteId) {
        throw { name: "error not found" };
      }
      await order.destroy();
      res
        .status(200)
        .json({ message: `Order id ${deleteId} success to delete` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateImg(req, res, next) {
    try {
      const { id } = req.params;
      const figure = await Figure.findByPk(id);
      if (!figure) throw { name: "error not found" };
      if (!req.file) {
        throw { name: "validation errors" };
      }
      const buffer = req.file.buffer.toString("base64");
      const base64 = `data:${req.file.mimetype};base64,${buffer}`;
      let result = await cloudinary.uploader.upload(base64);
      await figure.update({ imageUrl: result.url });
      res.status(200).json({ message: `Image ${figure.title} updated` });
    } catch (error) {
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const { OAuth2Client } = require("google-auth-library");
      const client = new OAuth2Client();
      const { googleToken } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience:
          "830526763865-jbqre9ju3t1280rn78eemcsgvppqgdbd.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      // const userid = payload["sub"];

      let user = await User.findOne({ where: { email: payload.email } });
      if (!user) {
        return await User.create(
          { email: payload.email, password: "arditama" },
          {
            hooks: false,
          }
        );
      }
      const access_token = createToken({ id: user.id });
      res.status(200).json({ message: "Login Success", access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
