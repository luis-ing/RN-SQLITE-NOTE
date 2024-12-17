import React from 'react'
import { Dimensions, StyleSheet, useColorScheme, View, ViewProps } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    runOnJS,
    useAnimatedGestureHandler,
    interpolate
} from 'react-native-reanimated';
import {
    PanGestureHandler,
    GestureHandlerRootView,
    PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler';
import { ThemedText } from './ThemedText'
import { notaType } from '@/database/database'

type ThemedCardProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'flat';
    data: notaType;
    onDelete: (id: number) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

const ThemedCard = ({ data, onDelete }: ThemedCardProps) => {
    const colorScheme = useColorScheme();
    const translateX = useSharedValue(0);
    const isDeleting = useSharedValue(false);

    const backgroundColor =
        colorScheme === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.05)';

    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            // Solo permite deslizar hacia la izquierda
            if (event.translationX < 0) {
                translateX.value = event.translationX;
            }
        },
        onEnd: (event) => {
            if (event.translationX < -SWIPE_THRESHOLD) {
                // Deslizamiento completado para eliminar
                isDeleting.value = true;
                translateX.value = withTiming(-SCREEN_WIDTH);
                runOnJS(onDelete)(data.id);
            } else {
                // Regresar a la posición original
                translateX.value = withTiming(0);
            }
        }
    });

    const animatedCardStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateX.value,
            [-SCREEN_WIDTH, 0],
            [0.7, 1]
        );

        return {
            transform: [
                { translateX: translateX.value },
                { scale: scale }
            ],
            opacity: interpolate(
                translateX.value,
                [-SCREEN_WIDTH, -SCREEN_WIDTH * 0.5, 0],
                [0, 0.5, 1]
            )
        };
    });

    return (
        <GestureHandlerRootView style={styles.gestureRootView}>
            <View style={styles.container}>
                <PanGestureHandler onGestureEvent={panGestureEvent}>
                    <Animated.View
                        style={[
                            styles.card,
                            { backgroundColor },
                            animatedCardStyle
                        ]}
                    >
                        <ThemedText>{data.titulo}</ThemedText>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    gestureRootView: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 32
    },
    card: {
        flex: 1,
        marginVertical: 6,
        borderRadius: 6,
        padding: 12,
        shadowColor: '#000',
        shadowRadius: 0,
        shadowOffset: { width: 0, height: 2 },
        zIndex: 2,
    },
    deleteContainer: {
        position: 'absolute',
        right: 0,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.3,
        height: '100%',
        borderRadius: 6,
        zIndex: 1,
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
})

export default ThemedCard
