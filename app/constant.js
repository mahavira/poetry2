// 分享描述
export const SHARE_DESC = '春城无处不飞花'
export const WX_CONFIG_URL = 'http://wechat.pdmi.cn/wechat/sign'

//最大关卡数
export const MAX_PASS = 5
//每个关卡题目数
export const PASS_QUESTION_COUNT = 4

// 倒计时长度
export const MAX_TIME = 20
// 小提示消息
export const MESSAGE = {
  noComplete: '您还没有做出选择',
  answerWrong: '回答错误了！',
  answerRight: '回答正确！',
  noHelper: '帮忙用完了！',
  noErrorWord: '没有更多错别字了！',
  noRemoveKeyword: '关键字不可移除！',
  noMugeda:'请接入Mugeda'
}
var template = '您成功填写了{score}句诗词\n厉害了\n恭喜你获得了{rank}快去邀请朋友一起参加挑战吧!'
var templateShare = '在飞花令新玩法中，我获得了“{rank}”称号！快来挑战我吧！'
var templateShare2 = '在飞花令新玩法中，我获得了“{rank}”！快来挑战我吧！'
/**
  * 头衔。小于或者等于maxScore
 * frame: 对应mugeda的时间帧
  */
export const RANK_SCALE = [{
  maxScore: -1,
  title: '',
  content: '“飞花令”新玩法，你敢来挑战吗？',
  shareContent: '“飞花令”新玩法，你敢来挑战吗？'
}, {
  maxScore: 0,
  title: '无名',
  content: '卷土重来未可知\n再试一次可吧！',
  shareContent: '“飞花令”新玩法，你敢来挑战吗？'
}, {
  maxScore: 5,
  title: '初入诗海',
  content: template,
  shareContent: templateShare
}, {
  maxScore: 10,
  title: '纵横江湖',
  content: template,
  shareContent: templateShare
}, {
  maxScore: 15,
  title: '醉卧辞海',
  content: template,
  shareContent: templateShare
}, {
  maxScore: 20,
  title: '杜甫的热泪',
  content: template,
  shareContent: templateShare2
}, {
  maxScore: 29,
  title: '李白的膝盖',
  content: template,
  shareContent: templateShare2

}, {
  maxScore: 30,
  title: '李白的膝盖',
  content: '您已成功答对了全部题目\n恭喜您！挑战成功！\n荣获{rank}',
  shareContent: templateShare2
}]

export const DIALOG_CONTENT = '您成功填写了{score}句诗词\n已获得“{rank}”称号\n请继续努力'
