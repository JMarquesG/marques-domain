declare const preset: {
    darkMode: ["class"];
    theme: {
        container: {
            center: true;
            padding: string;
            screens: {
                '2xl': string;
            };
        };
        extend: {
            colors: {
                border: string;
                input: string;
                ring: string;
                background: string;
                foreground: string;
                primary: {
                    DEFAULT: string;
                    foreground: string;
                };
                secondary: {
                    DEFAULT: string;
                    foreground: string;
                };
                destructive: {
                    DEFAULT: string;
                    foreground: string;
                };
                muted: {
                    DEFAULT: string;
                    foreground: string;
                };
                accent: {
                    DEFAULT: string;
                    foreground: string;
                };
                popover: {
                    DEFAULT: string;
                    foreground: string;
                };
                card: {
                    DEFAULT: string;
                    foreground: string;
                };
                sidebar: {
                    DEFAULT: string;
                    foreground: string;
                    primary: string;
                    'primary-foreground': string;
                    accent: string;
                    'accent-foreground': string;
                    border: string;
                    ring: string;
                };
                dark: {
                    100: string;
                    200: string;
                    300: string;
                };
                gold: {
                    100: string;
                    200: string;
                    300: string;
                };
            };
            borderRadius: {
                lg: string;
                md: string;
                sm: string;
            };
            fontFamily: {
                sans: [string, string, string];
                mono: [string, string];
            };
            keyframes: {
                'accordion-down': {
                    from: {
                        height: string;
                    };
                    to: {
                        height: string;
                    };
                };
                'accordion-up': {
                    from: {
                        height: string;
                    };
                    to: {
                        height: string;
                    };
                };
                'fade-in': {
                    '0%': {
                        opacity: string;
                        transform: string;
                    };
                    '100%': {
                        opacity: string;
                        transform: string;
                    };
                };
                'fade-in-right': {
                    '0%': {
                        opacity: string;
                        transform: string;
                    };
                    '100%': {
                        opacity: string;
                        transform: string;
                    };
                };
                'slide-in-left': {
                    '0%': {
                        transform: string;
                    };
                    '100%': {
                        transform: string;
                    };
                };
                'slide-in-right': {
                    '0%': {
                        transform: string;
                    };
                    '100%': {
                        transform: string;
                    };
                };
            };
            animation: {
                'accordion-down': string;
                'accordion-up': string;
                'fade-in': string;
                'fade-in-right': string;
                'slide-in-left': string;
                'slide-in-right': string;
            };
            backgroundImage: {
                'hero-pattern': string;
            };
        };
    };
    plugins: any[];
};
export default preset;
