
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// New vibrant color palette
				vibrant: {
					purple: '#8B5CF6',
					pink: '#D946EF',
					blue: '#0EA5E9',
					green: '#10B981',
					orange: '#F97316',
					yellow: '#FBBF24',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				shimmer: {
					'0%': { backgroundPosition: '-500px 0' },
					'100%': { backgroundPosition: '500px 0' }
				},
				fadeIn: {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				slideUp: {
					from: { transform: 'translateY(20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				// 3D rotation effects
				rotateX: {
					'0%, 100%': { transform: 'rotateX(0deg)' },
					'50%': { transform: 'rotateX(10deg)' }
				},
				rotateY: {
					'0%, 100%': { transform: 'rotateY(0deg)' },
					'50%': { transform: 'rotateY(10deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'shimmer': 'shimmer 2s infinite linear',
				'fade-in': 'fadeIn 0.5s ease-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'pulse-slow': 'pulse 3s infinite',
				'float': 'float 3s ease-in-out infinite',
				// 3D animations
				'rotate-x': 'rotateX 6s ease-in-out infinite',
				'rotate-y': 'rotateY 6s ease-in-out infinite'
			},
			fontFamily: {
				sans: ['Inter var', 'sans-serif'],
				mono: ['Roboto Mono', 'monospace']
			},
			boxShadow: {
				'soft': '0 2px 15px rgba(0, 0, 0, 0.06)',
				'glass': '0 8px 32px rgba(0, 0, 0, 0.07)',
				// 3D shadows
				'3d-soft': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'3d': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'3d-intense': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'3d-harsh': '0 0 15px rgba(0, 0, 0, 0.1), 0 0 3px rgba(0, 0, 0, 0.05)',
			},
			backdropBlur: {
				xs: '2px'
			},
			// 3D transform utilities
			transform: {
				'3d': 'perspective(1000px)',
			},
			transformStyle: {
				'3d': 'preserve-3d',
			},
			transformOrigin: {
				'center-bottom': 'center bottom',
			},
			// Gradient backgrounds
			backgroundImage: {
				'gradient-purple-pink': 'linear-gradient(135deg, #8B5CF6, #D946EF)',
				'gradient-blue-purple': 'linear-gradient(135deg, #0EA5E9, #8B5CF6)',
				'gradient-green-blue': 'linear-gradient(135deg, #10B981, #0EA5E9)',
				'gradient-orange-yellow': 'linear-gradient(135deg, #F97316, #FBBF24)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
