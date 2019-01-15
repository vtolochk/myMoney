import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-native'
import { StyleSheet, Modal, Text } from 'react-native'
import { ScreenHeader, AddCategory } from '@components'
import { AddCategoryAction, RemoveCategoryAction } from '@redux'
import { Button, Container, Content, List, ListItem, Icon, Input, Footer, FooterTab, Toast, Root } from 'native-base'

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

	render() {
		const { categories, removeCategory, history } = this.props
		return (
			<Root>
				<Container>
					<ScreenHeader withBackButton history={history} title='Categories'/>
					<Content>
						<List>
							{categories.map((category, i) => ( 
								<ListItem style={styles.listItem} key={i}>
									<Input>{category}</Input>
									<Icon onPress={() => removeCategory(i)} style={styles.trashIcon} name='trash'/>
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
})

const mapDispatchToProps = dispatch => ({
	addCategory: (newCategory) => dispatch(AddCategoryAction(newCategory)),
	removeCategory: (index) => dispatch(RemoveCategoryAction(index))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen))