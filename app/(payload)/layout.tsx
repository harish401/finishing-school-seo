import config from '@/payload/payload.config';
import { importMap } from './admin/[[...segments]]/importMap';

import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import '@/styles/globals.css'; // Add CSS styles for Payload to load nicely

import { ServerFunctionClient } from 'payload';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const serverFunction: ServerFunctionClient = async function (args) {
    'use server';
    return handleServerFunctions({
      ...args,
      config,
      importMap,
    });
  };

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
};

export default Layout;
