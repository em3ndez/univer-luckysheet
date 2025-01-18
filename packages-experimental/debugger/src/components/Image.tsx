/**
 * Copyright 2023-present DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

const image = 'data:image/jpeg;base64,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';

export const ImageDemo = () => {
    return <img draggable="false" src={image} style={{ width: '100%', height: '100%' }} />;
};
