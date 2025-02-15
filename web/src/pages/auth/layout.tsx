"use client"
import StoreProvider from "../../lib/storeProvider";
import HeaderComponent from "../../components/shared/header";
import SiderComponent from "../../components/shared/sider";
import Router from 'next/router'
import NProgress from 'nprogress';
import styles from './layout.module.scss'
import { AppContext } from '../../lib/context';
import { Layout } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import 'nprogress/nprogress.css';

const { Header, Sider, Content } = Layout;

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    Router.events.on('routeChangeStart', () => {
        NProgress.start();
    });
    Router.events.on('routeChangeComplete', () => {
        NProgress.done()
    });
    Router.events.on('routeChangeError', () => {
        NProgress.done()
    });

    return (
        <AppContext.Provider value={{ socket: {}, theme: "light" }}>
            <StoreProvider>
                <Layout className={styles.appLayout}>
                    <Sider className={styles.appSider}>
                        <SiderComponent />
                    </Sider>
                    <Layout>
                        <Header className={styles.appHeader}>
                            <HeaderComponent />
                        </Header>
                        <Content className={styles.appContent}>
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            </StoreProvider>
        </AppContext.Provider>
    );
}
