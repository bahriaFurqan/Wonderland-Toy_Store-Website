import Header from './Header';
import Footer from './Footer';
import BubbleMenu from '../common/BubbleMenu';

const Layout = ({ children }) => {
    const menuItems = [
        {
            label: 'home',
            href: '/',
            ariaLabel: 'Home',
            rotation: -8,
            hoverStyles: { bgColor: '#ff6b9d', textColor: '#ffffff' }
        },
        {
            label: 'products',
            href: '/products',
            ariaLabel: 'Products',
            rotation: 8,
            hoverStyles: { bgColor: '#fbbf24', textColor: '#ffffff' }
        },
        {
            label: 'categories',
            href: '/categories',
            ariaLabel: 'Categories',
            rotation: -8,
            hoverStyles: { bgColor: '#a78bfa', textColor: '#ffffff' }
        },
        {
            label: 'about',
            href: '/about',
            ariaLabel: 'About',
            rotation: 8,
            hoverStyles: { bgColor: '#34d399', textColor: '#ffffff' }
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Fixed BubbleMenu on left side - below header */}
            <div className="fixed left-4 top-24 z-[9999]">
                <BubbleMenu
                    items={menuItems}
                    menuAriaLabel="Toggle navigation"
                    menuBg="#ffffff"
                    menuContentColor="#111111"
                    useFixedPosition={true}
                    animationEase="back.out(1.5)"
                    animationDuration={0.5}
                    staggerDelay={0.12}
                />
            </div>

            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
