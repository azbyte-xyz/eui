/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { EuiTitle } from '../title';
import { EuiI18n } from '../i18n';
import { withEuiTheme, WithEuiThemeProps } from '../../services';

import { euiErrorBoundaryStyles } from './error_boundary.styles';

interface EuiErrorBoundaryState {
  hasError: boolean;
  error?: string;
}

export type EuiErrorBoundaryProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * ReactNode to render as this component's content
     */
    children: ReactNode;
  };

type EuiErrorBoundaryExtendedProps = EuiErrorBoundaryProps & WithEuiThemeProps;

export class _EuiErrorBoundary extends Component<
  EuiErrorBoundaryExtendedProps,
  EuiErrorBoundaryState
> {
  constructor(props: EuiErrorBoundaryExtendedProps) {
    super(props);

    const errorState: EuiErrorBoundaryState = {
      hasError: false,
      error: undefined,
    };

    this.state = errorState;
  }

  componentDidCatch({ message, stack }: Error) {
    // Display fallback UI
    // Only Chrome includes the `message` property as part of `stack`.
    // For consistency, rebuild the full error text from the Error subparts.
    const idx = stack?.indexOf(message) || -1;
    const stackStr = idx > -1 ? stack?.substr(idx + message.length + 1) : stack;
    const error = `Error: ${message}
${stackStr}`;
    this.setState({
      hasError: true,
      error,
    });
  }

  render() {
    const {
      className,
      children,
      'data-test-subj': _dataTestSubj,
      theme,
      ...rest
    } = this.props;
    const dataTestSubj = classNames('euiErrorBoundary', _dataTestSubj);
    const styles = euiErrorBoundaryStyles(theme);

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          css={styles.euiErrorBoundary}
          className={classNames('euiErrorBoundary', className)}
          data-test-subj={dataTestSubj}
          {...rest}
        >
          <EuiTitle size="xs">
            <p>
              <EuiI18n token="euiErrorBoundary.error" default="Error" />
            </p>
          </EuiTitle>
          {this.state.error}
        </div>
      );
    }

    return children;
  }
}

export const EuiErrorBoundary = withEuiTheme<EuiErrorBoundaryProps>(
  _EuiErrorBoundary
);
