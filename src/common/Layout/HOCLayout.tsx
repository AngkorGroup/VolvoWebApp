import React from 'react';
import Layout from './Layout';

const HOCLayout = <P extends object>(Component: React.ComponentType<P>) =>
	class WithMenu extends React.Component<P> {
		public render() {
			const componentsProps = { ...this.props };
			return (
				<Layout>
					<Component {...componentsProps} />
				</Layout>
			);
		}
	};
export default HOCLayout;
