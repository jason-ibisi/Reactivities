import { AxiosResponse } from 'axios';
import React from 'react';
import { Message } from 'semantic-ui-react';

interface IProps {
  error: AxiosResponse;
  text: string;
}

const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
  return <Message error header={error.statusText} list={[text]} />;
};

export default ErrorMessage;
