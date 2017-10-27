# chat��
create database lyndon charset utf8;
use lyndon;
#�û���
create table user (
U_id  int auto_increment primary key comment '�û�ID',
U_loginID varchar(30) not null default '' comment '��½�û���',
U_nickname varchar(20) not null default ''  comment '�ǳ�',
U_passWord  char(32) not null default '' comment '����',
U_email varchar(30) not null default '' comment 'email',
U_regtime int  not null default 0 comment 'ע��ʱ��',
U_lastlogin int  not null default 0 comment '����½ʱ��',
U_signaTure  Varchar(100) null comment '����ǩ��',
U_headPortrait int  not null default 0 comment 'ͷ��',#���Head_id
U_friendshipPolicyId int not null default 0 comment '���Ѳ���',#���U_fd_id
U_userStateID Int  not null default 0 comment '�û�״̬',#���US_id
U_question varchar(30) null comment '�û�����',
U_answer varchar(30) null  comment '���Ѳ��Դ�'
)engine myisam charset utf8;
#�û�״̬�� UserState
create table UserState (
US_id int auto_increment primary key ,
US_name varchar(20) comment '״̬����',
)engine myisam charset utf8;
#���ѱ� Friends
create table Friends(
F_id int auto_increment primary key,
F_friendid int comment '����ID',
F_userId int comment '�Լ�ID',
F_name varchar(30) comment '��ע�ǳ�'
)engine myisam charset utf8;
#���Ѳ��Ա� FriendshipPolicy
create table FriendshipPolicy (
	U_fd_id int auto_increment primary key comment '����ID',
	U_friendshipPolicy varchar not null default '' comment '��������'		

)engine myisam charset utf8;

#ͷ��� HeadPortrai
create table HeadPortrai(
	Head_id int auto_increment primary key comment 'ͷ��ID',
	head_url varchar(30) comment 'ͷ��·��'
)engine myisam charset utf8;
#������  BackGroundImg
create table BackGroundImg(
	Bg_id int auto_increment primary key comment 'ͼƬID',
	Bg_url varchar(30) comment 'ͼƬ·��',
	Bg_name varchar(30)comment 'ͼƬ����'
)engine myisam charset utf8;

#��Ϣ��Messages
create table messages(
M_id int unsigned primary key auto_increment comment '��ϢID',
M_postMessages text comment '��Ϣ����',
M_status Bit comment '����״̬',
M_times datetime comment '����ʱ��',#���U_id
M_fromuserid int comment '������ID',#���U_id
M_touserid int comment '������ID'

)engine myisam charset utf8;








