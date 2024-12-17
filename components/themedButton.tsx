import { type TouchableHighlightProps, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = TouchableHighlightProps & {
    lightColor?: string;
    darkColor?: string;
    title?: string;
    mode?: 'default' | 'contained';
    colorType?: 'primary' | 'secondary' | 'info' | 'warning' | 'danger' | 'default' | 'custom';
};

const colorMap = {
    primary: { light: '#007bff', dark: '#0056b3', textLight: '#FFFFFF' },
    secondary: { light: '#6c757d', dark: '#343a40', textLight: '#FFFFFF' },
    info: { light: '#17a2b8', dark: '#117a8b', textLight: '#FFFFFF' },
    warning: { light: '#ffc107', dark: '#e0a800', textLight: '#000000' },
    danger: { light: '#dc3545', dark: '#b21f2d', textLight: '#FFFFFF' },
    default: { light: '#DDDDDD', dark: '#AAAAAA', textLight: '#000000' },
    custom: { light: '', dark: '', textLight: '' }, // Calculado dinámicamente si es necesario.
};

export function ThemedButton({
    style,
    onPress,
    lightColor,
    darkColor,
    title = '',
    mode = 'default',
    colorType = 'default',
    ...props
}: ThemedButtonProps) {
    const themeColors =
        colorType === 'custom'
            ? { light: lightColor || '#DDDDDD', dark: darkColor || '#AAAAAA', textLight: '#000000' }
            : colorMap[colorType];

    const backgroundColor = useThemeColor(themeColors, 'background');
    const textColor =
        colorType === 'custom'
            ? useThemeColor({ light: lightColor, dark: darkColor }, 'text') || '#FFFFFF'
            : themeColors.textLight;

    return (
        <TouchableHighlight
            style={[
                mode === 'default' ? styles.default : undefined,
                mode === 'contained' ? styles.contained : undefined,
                { backgroundColor: backgroundColor },
                style,
            ]}
            underlayColor={colorType !== 'custom' ? `${backgroundColor}CC` : 'rgba(200,200,200, 1)'}
            {...props}
            onPress={onPress}
        >
            <View style={[styles.viewCenter]}>
                <Text style={[{ color: textColor }, styles.textButton]}>{title}</Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    textButton: {
        fontWeight: '800',
        fontSize: 15
    },
    viewCenter: {
        alignItems: 'center'
    },
    default: {
        height: 40,
        padding: 10,
    },
    contained: {
        height: 40,
        borderRadius: 10,
        padding: 10,
    },
});