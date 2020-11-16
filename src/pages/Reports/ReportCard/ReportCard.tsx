import VolvoCardButton from 'common/components/VolvoCardButton/VolvoCardButton';
import { Filter } from 'common/utils';
import React, { useState } from 'react';
import ReportModal from '../ReportModal/ReportModal';

interface ReportCardProps {
	id: string;
	title: string;
	filters: Filter;
}

const ReportCard: React.FC<ReportCardProps> = ({
	id,
	title,
	filters,
}: ReportCardProps) => {
	const [showModal, setShowModal] = useState(false);
	const onClose = () => setShowModal(false);
	const onOpenModal = () => setShowModal(true);
	return (
		<React.Fragment>
			<VolvoCardButton id={id} title={title} onClick={onOpenModal} />
			{showModal && (
				<ReportModal
					id={id}
					show={showModal}
					title={title}
					filters={filters}
					onClose={onClose}
				/>
			)}
		</React.Fragment>
	);
};

export default ReportCard;
