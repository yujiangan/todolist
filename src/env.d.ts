interface Window {
  // 定义 __INITIAL_STATE__ 的类型（根据你的实际数据结构调整）
  __INITIAL_STATE__?: {
    todos?: Array<{
      id: number;
      text: string;
      completed: boolean;
    }>;
  };
}