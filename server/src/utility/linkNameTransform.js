export default function linkNameTransform(name) {
	const linkName = name.toLowerCase().replace(/\s/g, '-').replace(/,/g, '').replace(/åäÅÄ/g, 'a').replace(/öÖ/g, 'o');
	return linkName;
}
