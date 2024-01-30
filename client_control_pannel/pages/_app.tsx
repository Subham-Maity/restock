import React from "react";
import { AppProps } from "next/app";
import type { NextPage } from "next";
import { Refine, GitHubBanner, } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
    import { useNotificationProvider
,ThemedLayoutV2
,ThemedSiderV2} from '@refinedev/antd';
import routerProvider, { UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/nextjs-router";

import dataProvider, { GraphQLClient, liveProvider } from "@refinedev/nestjs-query";
import { createClient } from "graphql-ws";
import { App as AntdApp } from "antd"
import "@refinedev/antd/dist/reset.css";
import { Header } from "@components/header"
import { ColorModeContextProvider } from "@contexts";
import { authProvider } from "src/authProvider";


const API_URL = "https://api.nestjs-query.refine.dev/graphql";
const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";

const gqlClient = new GraphQLClient(API_URL);
const wsClient = createClient({ url: WS_URL });



export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
     noLayout?: boolean;
 };

 type AppPropsWithLayout = AppProps & {
     Component: NextPageWithLayout;
 };

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
    const renderComponent = () => {
        if (Component.noLayout) {
            return <Component {...pageProps} />;
        }

            return (
                <ThemedLayoutV2
                    Header={() => <Header sticky />}
                    Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                >
                    <Component {...pageProps} />
                </ThemedLayoutV2>
            );
    };

    
    
    return (
        <>
        <GitHubBanner />
        <RefineKbarProvider>
            <ColorModeContextProvider>
<AntdApp>
            <DevtoolsProvider>
                <Refine 
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(gqlClient)}
liveProvider={liveProvider(wsClient)}
notificationProvider={useNotificationProvider}
authProvider={authProvider}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                        useNewQueryKeys: true,
                            projectId: "8wuaEf-7HakyW-wlgKHH",
                        liveMode: "auto", 
                    }}
                >
                    {renderComponent()}
                    <RefineKbar />
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
                <DevtoolsPanel />
            </DevtoolsProvider>
                </AntdApp>
</ColorModeContextProvider>
        </RefineKbarProvider>
        </>
      );
};


export default MyApp;
