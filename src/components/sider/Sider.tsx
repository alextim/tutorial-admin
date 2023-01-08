import React, { useState } from "react";
import { Layout, Menu, Grid, ConfigProvider, Drawer, Button } from "antd";
import {
    DashboardOutlined,
    UnorderedListOutlined,
    BarsOutlined,
} from "@ant-design/icons";
import {
    useTranslate,
    useTitle,
    CanAccess,
    ITreeMenu,
    useRouterContext,
    useMenu,
    useRefineContext,
} from "@pankod/refine-core";

import { Title as DefaultTitle } from "../title";

import { drawerButtonStyles } from "./styles";
import type { RefineLayoutSiderProps } from "@pankod/refine-antd";


const { SubMenu } = Menu;

export const Sider: React.FC<RefineLayoutSiderProps> = ({ render }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const { Link } = useRouterContext();
    const Title = useTitle();
    const translate = useTranslate();
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
    const breakpoint = Grid.useBreakpoint();
    const { hasDashboard } = useRefineContext();

    const isMobile =
        typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

    const RenderToTitle = Title ?? DefaultTitle;

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
            const isRoute = !(
                parentName !== undefined && children.length === 0
            );
            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{
                        resource: item,
                    }}
                >
                    <Menu.Item
                        key={route}
                        style={{
                            fontWeight: isSelected ? "bold" : "normal",
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
                fontWeight: selectedKey === "/" ? "bold" : "normal",
            }}
            icon={<DashboardOutlined />}
        >
            <Link to="/">{translate("dashboard.title", "Dashboard")}</Link>
            {!collapsed && selectedKey === "/" && (
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
                logout: undefined,
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
                        setDrawerOpen(false);
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

    const renderDrawerSider = () => {
        return (
            <>
                <Drawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    placement="left"
                    closable={false}
                    width={200}
                    bodyStyle={{
                        padding: 0,
                    }}
                    maskClosable={true}
                >
                    <Layout>
                        <Layout.Sider
                            style={{ height: "100vh", overflow: "hidden" }}
                        >
                            <RenderToTitle collapsed={false} />
                            {renderMenu()}
                        </Layout.Sider>
                    </Layout>
                </Drawer>
                <Button
                    style={drawerButtonStyles}
                    size="large"
                    onClick={() => setDrawerOpen(true)}
                    icon={<BarsOutlined />}
                ></Button>
            </>
        );
    };

    const renderContent = () => {
        if (isMobile) {
            return renderDrawerSider();
        }

        return (
            <Layout.Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(collapsed: boolean): void =>
                    setCollapsed(collapsed)
                }
                collapsedWidth={80}
                breakpoint="lg"
            >
                <RenderToTitle collapsed={collapsed} />
                {renderMenu()}
            </Layout.Sider>
        );
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        colorItemBg: "transparent",
                        colorItemText: "#fff",
                        colorItemTextSelected: "#fff",
                        colorItemBgSelected: "transparent",
                        colorItemTextHover: "#fff",
                    },
                },
            }}
        >
            {renderContent()}
        </ConfigProvider>
    );
};
