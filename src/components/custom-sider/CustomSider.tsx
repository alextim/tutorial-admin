import React, { useState } from 'react';
import { AntdLayout, Menu, Grid, Sider } from '@pankod/refine-antd';
import { DashboardOutlined, UnorderedListOutlined } from '@ant-design/icons';
import {
  useTranslate,
  useTitle,
  CanAccess,
  ITreeMenu,
  useRouterContext,
  useMenu,
  useRefineContext,
} from '@pankod/refine-core';
import { antLayoutSider, antLayoutSiderMobile } from './styles';

const { SubMenu } = Menu;

export const CustomSider: typeof Sider = ({ render }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { Link } = useRouterContext();

  const Title = useTitle();
  const translate = useTranslate();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
  const breakpoint = Grid.useBreakpoint();
  const { hasDashboard } = useRefineContext();

  const isMobile =
    typeof breakpoint.lg === 'undefined' ? false : !breakpoint.lg;

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName } = item;

      if (children.length > 0) {
        return (
          <CanAccess
            key={route}
            resource={name.toLowerCase()}
            action="list"
            params={{
              resource: item,
            }}
          >
            <SubMenu
              key={route}
              icon={icon ?? <UnorderedListOutlined />}
              title={label}
            >
              {renderTreeView(children, selectedKey)}
            </SubMenu>
          </CanAccess>
        );
      }
      const isSelected = route === selectedKey;
      const isRoute = !(parentName !== undefined && children.length === 0);
      return (
        <CanAccess
          key={route}
          resource={name.toLowerCase()}
          action="list"
          params={{ resource: item }}
        >
          <Menu.Item
            key={route}
            style={{
              fontWeight: isSelected ? 'bold' : 'normal',
            }}
            icon={icon ?? (isRoute && <UnorderedListOutlined />)}
          >
            <Link to={route}>{label}</Link>
            {!collapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  const dashboard = hasDashboard ? (
    <Menu.Item
      key="dashboard"
      style={{
        fontWeight: selectedKey === '/' ? 'bold' : 'normal',
      }}
      icon={<DashboardOutlined />}
    >
      <Link to="/">{translate('dashboard.title', 'Dashboard')}</Link>
      {!collapsed && selectedKey === '/' && (
        <div className="ant-menu-tree-arrow" />
      )}
    </Menu.Item>
  ) : null;

  const items = renderTreeView(menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        items,
        logout: null,
        collapsed,
      });
    }
    return (
      <>
        {dashboard}
        {items}
      </>
    );
  };

  const renderMenu = () => {
    return (
      <>
        <Menu
          theme="dark"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={defaultOpenKeys}
          mode="inline"
          onClick={() => {
            // setDrawerOpen(false);
            if (!breakpoint.lg) {
              setCollapsed(true);
            }
          }}
        >
          {renderSider()}
        </Menu>
      </>
    );
  };

  return (
    <AntdLayout.Sider
      collapsible
      collapsedWidth={isMobile ? 0 : 80}
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      style={isMobile ? antLayoutSiderMobile : antLayoutSider}
    >
      {Title && <Title collapsed={collapsed} />}
      {renderMenu()}
    </AntdLayout.Sider>
  );
};
