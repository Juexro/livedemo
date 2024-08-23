import React from 'react';
import Icon from '@ant-design/icons';
import type { GetProps } from 'antd';

type CustomIconComponentProps = GetProps<typeof Icon>;

const NpmSvg = () => (
  <svg viewBox="0 0 780 250" aria-hidden="true" fill="currentColor"><path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"></path></svg>
);

export const NpmIcon =(props: Partial<CustomIconComponentProps>) => (
  <Icon component={NpmSvg} {...props} />
);