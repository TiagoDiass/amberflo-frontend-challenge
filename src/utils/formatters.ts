function formatDate(dateString: string) {
	return new Date(dateString).toLocaleString('en-US');
}

const formatters = {
	formatDate,
};

export { formatters };
