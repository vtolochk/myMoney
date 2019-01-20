import React from 'react'
import { Dimensions, View, StyleSheet } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

const styles = StyleSheet.create({
	chart: {
		marginVertical: 8,
		borderRadius: 16,
		marginHorizontal: 8
	}
})

class OverviewChart extends React.PureComponent {
	render() {
		const data = this.props.categories.map(cat => {
			return { name: cat.name.substr(0, 4), sum: cat.sum } // cut the name here
		})
		return (
			<View>
				<LineChart
					data={{
						labels: data.map(item => item.name),
						datasets: [{ data: data.map(item => item.sum) }]
					}}
					width={Dimensions.get('window').width - 16}
					height={220}
					chartConfig={{
						backgroundColor: '#e26a00',
						backgroundGradientFrom: '#fb8c00',
						backgroundGradientTo: '#ffa726',
						decimalPlaces: 2,
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: { borderRadius: 16 }
					}}
					bezier
					style={styles.chart}
				/>
			</View>
		)
	}
}

export default OverviewChart