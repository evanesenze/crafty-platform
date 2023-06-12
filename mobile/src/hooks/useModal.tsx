import { DialogProps } from '@rneui/base';
import React from 'react';
import { useState } from 'react';

export type CommonModalProps<P extends CommonComponentProps, T = unknown> = DialogProps & { onSubmit(data: T): void; props: P };

export type CommonComponentProps = { key: React.Key };

function useModal<P extends CommonComponentProps, T>(
  Component: React.FC<CommonModalProps<P, T>>,
  props: P
): [() => void, JSX.Element, T | undefined] {
  const [opened, setOpened] = useState(false);
  const [data, setData] = useState<T>();

  const open = () => setOpened(true);

  return [open, <Component key={props.key} props={props} isVisible={opened} onBackdropPress={() => setOpened(false)} onSubmit={setData} />, data];
}

export default useModal;
