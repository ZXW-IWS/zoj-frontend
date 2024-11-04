export const TOKEN_KEY = 'Authorization';
export const FOOTER_TEXT = 'zoj - 个人开发项目';

export const DIFFICULT_ARR = ['简单', '中等', '困难'];
export const JUDGE_QUESTION_STATUS_ARR = [
  '待判题',
  '判题中',
  '判题成功',
  '判题失败',
];
export const formatMemorySize = (bytes: number) => {
  if (bytes === null) {
    return undefined;
  }
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};

export const formatTime = (time: number) => {
  if (time === null) return undefined;
  return time + 'ms';
};
