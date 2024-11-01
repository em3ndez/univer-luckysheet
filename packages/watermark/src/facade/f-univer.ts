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

import type { IImageWatermarkConfig, ITextWatermarkConfig } from '../common/type';
import { FUniver } from '@univerjs/core';
import { WatermarkImageBaseConfig, WatermarkTextBaseConfig } from '../common/const';
import { IWatermarkTypeEnum } from '../common/type';
import { WatermarkService } from '../services/watermark.service';

interface IFUniverWatermarkMixin {
    /**
     * Adds a watermark to the unit. Supports both text and image watermarks based on the specified type.
     *
     * @param {IWatermarkTypeEnum.Text | IWatermarkTypeEnum.Image} type - The type of watermark to add. Can be either 'Text' or 'Image'.
     * @param {ITextWatermarkConfig | IImageWatermarkConfig} config - The configuration object for the watermark.
     * - If the type is 'Text', the config should follow the ITextWatermarkConfig interface.
     * - If the type is 'Image', the config should follow the IImageWatermarkConfig interface.
     * @throws {Error} Throws an error if the watermark type is unknown.
     */
    addWatermark(type: IWatermarkTypeEnum.Text, config: ITextWatermarkConfig): void;
    addWatermark(type: IWatermarkTypeEnum.Image, config: IImageWatermarkConfig): void;
    addWatermark(
        type: IWatermarkTypeEnum.Text | IWatermarkTypeEnum.Image,
        config: ITextWatermarkConfig | IImageWatermarkConfig
    ): void;

    /**
     * Deletes the currently applied watermark from the unit.
     *
     * This function retrieves the watermark service and invokes the method to remove any existing watermark configuration.
     */
    deleteWatermark(): void;
}

class FUniverWatermarkMixin extends FUniver {
    // #region watermark

    override addWatermark(type: IWatermarkTypeEnum.Text, config: ITextWatermarkConfig): void;
    override addWatermark(type: IWatermarkTypeEnum.Image, config: IImageWatermarkConfig): void;
    override addWatermark(
        type: IWatermarkTypeEnum.Text | IWatermarkTypeEnum.Image,
        config: ITextWatermarkConfig | IImageWatermarkConfig
    ): void {
        const watermarkService = this._injector.get(WatermarkService);
        if (type === IWatermarkTypeEnum.Text) {
            watermarkService.updateWatermarkConfig({
                type: IWatermarkTypeEnum.Text,
                config: {
                    text: {
                        ...WatermarkTextBaseConfig,
                        ...config,
                    },
                },
            });
        } else if (type === IWatermarkTypeEnum.Image) {
            watermarkService.updateWatermarkConfig({
                type: IWatermarkTypeEnum.Image,
                config: {
                    image: {
                        ...WatermarkImageBaseConfig,
                        ...config,
                    },
                },
            });
        } else {
            throw new Error('Unknown watermark type');
        }
    }

    override deleteWatermark(): void {
        const watermarkService = this._injector.get(WatermarkService);
        watermarkService.deleteWatermarkConfig();
    }
}

FUniver.extend(FUniverWatermarkMixin);
declare module '@univerjs/core' {
    // eslint-disable-next-line ts/naming-convention
    interface FUniver extends IFUniverWatermarkMixin {}
}