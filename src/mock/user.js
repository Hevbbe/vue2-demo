import Mock from "mockjs";

// 获取用户信息
Mock.mock("/api/user/info", "get", () => {
  return {
    code: 200,
    data: {
      name: "Mock 用户",
      age: 18,
      email: "123456789@qq.com",
    },
  };
});
