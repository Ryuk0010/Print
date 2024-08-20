"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContent = exports.createContent = exports.signinInput = exports.signupInput = void 0;
var zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional()
});
exports.signinInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.createContent = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.updateContent = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string()
});
