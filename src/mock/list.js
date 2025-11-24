import Mock from "mockjs";

// 轮播图
Mock.mock("/api/carousel", "get", (options) => {
  const { count } = JSON.parse(options.body);

  let list = Mock.mock({
    [`array|${count}`]: [
      {
        id: "@guid", // 全局唯一 ID
        desc: "@cparagraph(1)", // 随机中文描述（可选）
      },
    ],
  }).array;

  list = Array.isArray(list) ? list : [list];

  return {
    code: 200,
    list,
  };
});
