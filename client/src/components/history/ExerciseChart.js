import React, { useRef, useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Spinner from '../layout/Spinner';

const ExerciseChart = ({ exercises }) => {
	const ctxRef = useRef(null);
	const inputLabel = useRef(null);

	const [labelWidth, setLabelWidth] = useState(0);
	const [currentExercise, setCurrentExercise] = useState(exercises[0]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [currentChart, setCurrentChart] = useState();

	const onChange = (e) => {
		setSelectedIndex(parseInt(e.target.value, 10));
		setCurrentExercise(exercises[e.target.value]);
	};

	useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	useEffect(() => {
		const ctx = ctxRef.current.getContext('2d');

		const dates = currentExercise.history.map(historyEntry => {
			const date = new Date(historyEntry.date).toLocaleDateString();
			return date;
		})

		const weights = currentExercise.history.map(historyEntry => {
			const { weight } = historyEntry;
			return weight;
		})

		if (typeof currentChart !== "undefined") currentChart.destroy();

		const chart = new Chart(ctx, {
			type: "line",
			data: {
				labels: dates,
				datasets: [
					{
						label: currentExercise.name,
						data: weights,
						fill: false
					}
				]
			},
			options: {}
		});

		setCurrentChart(chart);

	}, [currentExercise]);

	return exercises ? (
		<Fragment>
			<div className="form-group-category justify-center mt-4">
				<FormControl required className="flex-grow" variant="outlined">
					<InputLabel ref={inputLabel} className="" htmlFor="current-exercise">Exercise:</InputLabel>
					<Select
						native
						className="exercise-select"
						value={selectedIndex}
						labelWidth={labelWidth}
						onChange={(e) => onChange(e)}
						inputProps={{
							name: 'current-exercise',
							id: 'current-exercise'
						}}
					>
						<option value="" />
						{exercises.map((exercise, index) => (
							<option key={exercise.name} value={index}>{exercise.name}</option>
						))}
					</Select>
				</FormControl>
			</div>
			<canvas ref={ctxRef} id="line-chart" width="375" height="450"></canvas>
		</Fragment>
	) : (
			<Spinner />
		)
}

ExerciseChart.propTypes = {
	exercises: PropTypes.array.isRequired,
}

export default ExerciseChart;
