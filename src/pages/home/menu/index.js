import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class Sider extends React.Component {
  handleClick = e => {
    //console.log('click ', e);
    //console.log(this.props);
    switch (e.key) {
      case 1:

    }
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        
        mode="inline"
      >
        {/* <Menu.Item key={"0"}>我的课程</Menu.Item> */}



        <Menu.Item key="1"><NavLink to={'/home/createcourse'}>创建课程</NavLink></Menu.Item>
        <Menu.Item key="2"><NavLink to={'/home/mycourses'}>我的课程</NavLink></Menu.Item>


        <Menu.Item key="5"><NavLink to={'/home/studentcontrol'}>学生管理</NavLink></Menu.Item>
        <Menu.Item key="6"><NavLink to={'/home/createcourse'}>个人中心</NavLink></Menu.Item>


      </Menu>
    );
  }
}
export default Sider
