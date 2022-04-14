import React from 'react';

interface Props {
  message: string;
}

export function Error({ message }: Props) {
  return <p>{message}</p>;
}
