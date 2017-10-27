# chat库
create database lyndon charset utf8;
use lyndon;
#用户表
create table user (
U_id  int auto_increment primary key comment '用户ID',
U_loginID varchar(30) not null default '' comment '登陆用户名',
U_nickname varchar(20) not null default ''  comment '昵称',
U_passWord  char(32) not null default '' comment '密码',
U_email varchar(30) not null default '' comment 'email',
U_regtime int  not null default 0 comment '注册时间',
U_lastlogin int  not null default 0 comment '最后登陆时间',
U_signaTure  Varchar(100) null comment '个性签名',
U_headPortrait int  not null default 0 comment '头像',#外键Head_id
U_friendshipPolicyId int not null default 0 comment '好友策略',#外键U_fd_id
U_userStateID Int  not null default 0 comment '用户状态',#外键US_id
U_question varchar(30) null comment '用户问题',
U_answer varchar(30) null  comment '好友策略答案'
)engine myisam charset utf8;
#用户状态表 UserState
create table UserState (
US_id int auto_increment primary key ,
US_name varchar(20) comment '状态名字',
)engine myisam charset utf8;
#好友表 Friends
create table Friends(
F_id int auto_increment primary key,
F_friendid int comment '朋友ID',
F_userId int comment '自己ID',
F_name varchar(30) comment '备注昵称'
)engine myisam charset utf8;
#好友策略表 FriendshipPolicy
create table FriendshipPolicy (
	U_fd_id int auto_increment primary key comment '策略ID',
	U_friendshipPolicy varchar not null default '' comment '策略名字'		

)engine myisam charset utf8;

#头像表 HeadPortrai
create table HeadPortrai(
	Head_id int auto_increment primary key comment '头像ID',
	head_url varchar(30) comment '头像路径'
)engine myisam charset utf8;
#背景表  BackGroundImg
create table BackGroundImg(
	Bg_id int auto_increment primary key comment '图片ID',
	Bg_url varchar(30) comment '图片路径',
	Bg_name varchar(30)comment '图片名字'
)engine myisam charset utf8;

#信息表Messages
create table messages(
M_id int unsigned primary key auto_increment comment '消息ID',
M_postMessages text comment '消息内容',
M_status Bit comment '接受状态',
M_times datetime comment '发送时间',#外键U_id
M_fromuserid int comment '发送者ID',#外键U_id
M_touserid int comment '接收者ID'

)engine myisam charset utf8;








