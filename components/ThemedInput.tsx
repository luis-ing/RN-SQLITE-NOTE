import { type TextInputProps, StyleSheet, TextInput } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'flat';
    placeholder?: string;
    value?: string;
};

export function ThemedInput({
    style,
    lightColor,
    darkColor,
    type = 'default',
    placeholder,
    value,
    onChange,
}: ThemedInputProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <TextInput
            style={[
                { color, borderColor: color },
                type === 'default' ? styles.default : undefined,
                type === 'flat' ? styles.flat : undefined,
                style,
            ]}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        // width: "100%",
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
    flat: {
        // width: "100%",
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
});