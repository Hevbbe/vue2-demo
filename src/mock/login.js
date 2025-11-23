import Mock from "mockjs";

// 登录接口
Mock.mock("/api/login", "post", (req) => {
  const body = JSON.parse(req.body || "{}");

  if (body.username === "admin" && body.password === "123456") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        token: "mock-token-" + Date.now(),
        username: "admin",
      },
    };
  }

  return {
    code: 400,
    message: "用户名或密码错误",
  };
});
