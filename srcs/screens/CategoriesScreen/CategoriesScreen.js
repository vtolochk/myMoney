import React from 'react'
import { alert } from '@config'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { StyleSheet, Modal, Text } from 'react-native'
import { ScreenHeader, AddCategory } from '@components'
import { Button, Container, Content, List, ListItem, Icon, Input, Footer, FooterTab, Toast, Root } from 'native-base'
import { addCategoryAction, removeCategoryAction, changeCategoryNameAction, removeAllTransactionsWithCategoryAction, changeBalanceWithCategoryAction } from '@redux'

const styles = StyleSheet.create({
	addButton: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center', 
		alignItems: 'center',
	},
	addText: {
		fontSize: 22
	},
	addIcon: {
		fontSize: 30
	},
	input: {
		borderBottomColor: 'grey', 
		borderBottomWidth: 1, 
		fontSize: 28
	},
	trashIcon: {
		color: 'red'
	},
	listItem: {
		justifyContent: 'space-between'
	},
	toastStyle: {
		marginBottom: 20
	}
})

class CategoriesScreen extends React.Component {

	state = {
		showModal: false
	}

	toggleModal = () => {
		this.setState({ showModal: !this.state.showModal })
	}

	onSaveCategory = (newCategory) => {
		if (newCategory.length) {
			this.props.addCategory(newCategory)
			this.toggleModal()
			Toast.show({ text: 'New category added!', buttonText: 'Okay', duration: 2000, style: styles.toastStyle })
		}
	}

	removeCategory = (index) => {
		
		const onOkay = () => {
			this.props.changeBalanceWithCategory(this.props.transactions, index)
			this.props.removeAllTransactionsWithCategory(index)
			this.props.removeCategory(index)
		}

		alert('Are you sure?', 'It will delete all the transactions with this category as well.', onOkay)
	}

	render() {
		const { categories, changeCategoryName, history } = this.props
		return (
			<Root>
				<Container>
					<ScreenHeader withBackButton history={history} title='Categories'/>
					<Content>
						<List>
							{categories.map((category, i) => (
								<ListItem style={styles.listItem} key={i}>
									<Input value={category} onChangeText={(name) => changeCategoryName(name, i)} />
									<Icon onPress={() => this.removeCategory(i)} style={styles.trashIcon} name='trash'/>
								</ListItem> 
							))}             
						</List>
					</Content>
					<Footer>
						<FooterTab>
							<Button active style={styles.addButton} onPress={this.toggleModal}>
								<Modal 
									animationType="slide"
									transparent={false}
									visible={this.state.showModal}
									onRequestClose={this.toggleModal}>
									<Root>
										<AddCategory onSave={this.onSaveCategory} onClose={this.toggleModal} />
									</Root>
								</Modal>
								<Icon style={styles.addIcon} name='add' />
								<Text style={styles.addText}>Add category</Text>
							</Button>
						</FooterTab>
					</Footer>
				</Container>
			</Root>
		)
	}
}

const mapStateToProps = state => ({
	categories: state.categoriesReducer.categories,
	transactions: state.transactionReducer.transactions,
})

const mapDispatchToProps = dispatch => ({
	removeCategory: index => dispatch(removeCategoryAction(index)),
	addCategory: newCategory => dispatch(addCategoryAction(newCategory)),
	changeBalanceWithCategory: (transactions, categoryId) => dispatch(changeBalanceWithCategoryAction(transactions, categoryId)),
	changeCategoryName: (name, index) => dispatch(changeCategoryNameAction(name, index)),
	removeAllTransactionsWithCategory: categoryId => dispatch(removeAllTransactionsWithCategoryAction(categoryId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen))