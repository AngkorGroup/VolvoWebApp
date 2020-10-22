import { Box } from '@material-ui/core';
import React from 'react';

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

const TabPanel: React.FC<TabPanelProps> = ({
	children,
	value,
	index,
}: TabPanelProps) => {
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
};

export default TabPanel;
