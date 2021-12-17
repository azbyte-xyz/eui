/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma, { ColorSpaces } from 'chroma-js';

export const HEX_FALLBACK = '';
export const HSV_FALLBACK: ColorSpaces['hsv'] = [0, 0, 0];
export const RGB_FALLBACK: ColorSpaces['rgba'] = [NaN, NaN, NaN, 1];
export const RGB_JOIN = ', ';

// Given a string, this attempts to return a format that can be consumed by chroma-js
export const parseColor = (input?: string | null) => {
  let parsed: string | number[];
  if (!input) return null;
  if (input.indexOf(',') > 0) {
    if (!/^[\s,.0-9]*$/.test(input)) {
      return null;
    }
    const rgb = input
      .trim()
      .split(',')
      .filter((n) => n !== '')
      .map(Number);
    parsed = rgb.length > 2 && rgb.length < 5 ? rgb : HEX_FALLBACK;
  } else {
    parsed = input;
  }
  return parsed;
};

// Returns whether the given input will return a valid chroma-js object when designated as one of
// the acceptable formats: hex, rgb, rgba
export const chromaValid = (color: string | number[]) => {
  let parsed: string | number[] | null = color;
  if (typeof color === 'string') {
    parsed = parseColor(color);
  }

  if (!parsed) return false;

  if (typeof parsed === 'object') {
    return chroma.valid(parsed, 'rgb') || chroma.valid(parsed, 'rgba');
  }
  return chroma.valid(color, 'hex');
};
