/**
 * Pruebas unitarias para authController
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const { expect } = require('chai');
const sinon = require('sinon');
const authController = require('../../src/controllers/authController');
const User = require('../../src/models/User');

describe('Auth Controller', () => {
  let req, res, sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = {
      body: {},
      headers: {},
    };
    res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      // Arrange
      req.body = {
        email: 'test@elev8.com',
        password: '123456',
        firstName: 'Test',
        lastName: 'User',
        phone: '3101234567',
      };

      const mockUser = {
        _id: '123456',
        email: 'test@elev8.com',
        firstName: 'Test',
        lastName: 'User',
        save: sandbox.stub().resolves(),
        toJSON: () => ({
          _id: '123456',
          email: 'test@elev8.com',
          firstName: 'Test',
          lastName: 'User',
        }),
      };

      sandbox.stub(User, 'findOne').resolves(null);
      sandbox.stub(User.prototype, 'save').resolves(mockUser);
      sandbox.stub(User, 'create').resolves(mockUser);

      // Act
      await authController.register(req, res);

      // Assert
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(sinon.match({
        success: true,
        message: 'Usuario registrado correctamente',
        user: sinon.match.object,
        token: sinon.match.string,
      }))).to.be.true;
    });

    it('should return error if email already exists', async () => {
      // Arrange
      req.body = {
        email: 'existing@elev8.com',
        password: '123456',
        firstName: 'Test',
      };

      const existingUser = {
        _id: '789012',
        email: 'existing@elev8.com',
      };

      sandbox.stub(User, 'findOne').resolves(existingUser);

      // Act
      await authController.register(req, res);

      // Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith(sinon.match({
        success: false,
        message: 'El correo electrónico ya está registrado',
      }))).to.be.true;
    });

    it('should return error if required fields are missing', async () => {
      // Arrange
      req.body = {
        email: 'test@elev8.com',
      };

      // Act
      await authController.register(req, res);

      // Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith(sinon.match({
        success: false,
        message: 'Faltan campos obligatorios: email, password, firstName',
      }))).to.be.true;
    });
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
      // Arrange
      req.body = {
        email: 'test@elev8.com',
        password: '123456',
      };

      const mockUser = {
        _id: '123456',
        email: 'test@elev8.com',
        firstName: 'Test',
        lastName: 'User',
        comparePassword: sandbox.stub().resolves(true),
        save: sandbox.stub().resolves(),
        toJSON: () => ({
          _id: '123456',
          email: 'test@elev8.com',
          firstName: 'Test',
          lastName: 'User',
        }),
      };

      sandbox.stub(User, 'findOne').resolves(mockUser);

      // Act
      await authController.login(req, res);

      // Assert
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match({
        success: true,
        message: 'Autenticación satisfactoria',
        user: sinon.match.object,
        token: sinon.match.string,
      }))).to.be.true;
    });

    it('should return error for invalid credentials', async () => {
      // Arrange
      req.body = {
        email: 'test@elev8.com',
        password: 'wrongpassword',
      };

      const mockUser = {
        email: 'test@elev8.com',
        comparePassword: sandbox.stub().resolves(false),
      };

      sandbox.stub(User, 'findOne').resolves(mockUser);

      // Act
      await authController.login(req, res);

      // Assert
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith(sinon.match({
        success: false,
        message: 'Correo o contraseña incorrectos',
      }))).to.be.true;
    });

    it('should return error if user not found', async () => {
      // Arrange
      req.body = {
        email: 'nonexistent@elev8.com',
        password: '123456',
      };

      sandbox.stub(User, 'findOne').resolves(null);

      // Act
      await authController.login(req, res);

      // Assert
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith(sinon.match({
        success: false,
        message: 'Correo o contraseña incorrectos',
      }))).to.be.true;
    });
  });
});