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

import type { ReactNode } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DropdownContext } from './DropdownContext';

interface IDropdownProviderProps {
    visible?: boolean;
    children: ReactNode;
    disabled?: boolean;
    onVisibleChange?: (visible: boolean) => void;
}

export function DropdownProvider({ visible, children, disabled = false, onVisibleChange }: IDropdownProviderProps) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const [internalShow, setInternalShow] = useState(false);
    const isControlled = visible !== undefined;
    const show = isControlled ? visible : internalShow;

    const updateShow = (newShow: boolean) => {
        if (disabled) return;

        if (!isControlled) {
            setInternalShow(newShow);
        }
        onVisibleChange?.(newShow);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!triggerRef.current?.contains(target) && !overlayRef.current?.contains(target)) {
                updateShow(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside, true);
        return () => window.removeEventListener('mousedown', handleClickOutside, true);
    }, []);

    const contextValue = useMemo(() => ({ show, updateShow, disabled, triggerRef, overlayRef }), [show, disabled]);

    return (
        <DropdownContext.Provider value={contextValue}>
            {children}
        </DropdownContext.Provider>
    );
}