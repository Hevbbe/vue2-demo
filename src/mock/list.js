import Mock from "mockjs";
const Random = Mock.Random;

// 轮播图
Mock.mock("/api/carousel", "get", (options) => {
  const { count } = JSON.parse(options.body);

  let list = Mock.mock({
    [`array|${count}`]: [
      {
        id: "@guid", // 全局唯一 ID
        img: Random.image("640x150", "jpg"),
        desc: "@cparagraph(1)", // 随机中文描述（可选）
      },
    ],
  }).array;

  // 关键修复：强制转为数组（count=1 时包装成数组，count>1 时保持不变）
  list = Array.isArray(list) ? list : [list];

  return {
    code: 200,
    list, // 始终是数组：count=1 时为 [{...}], count>1 时为 [{...}, {...}]
    total: count,
  };
});
