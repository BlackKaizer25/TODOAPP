import React, { useState } from "react"; 
import { 
	View, 
	Text, 
	TextInput, 
	TouchableOpacity, 
	FlatList, 
	StyleSheet, 
} from "react-native"; 

const App = () => { 
	const [task, setTask] = useState(""); 
	const [tasks, setTasks] = useState([]); 
	const [editIndex, setEditIndex] = useState(-1); 

	const handleAddTask = () => { 
		if (task) { 
			if (editIndex !== -1) { 
				// Edit existing task 
				const updatedTasks = [...tasks]; 
				updatedTasks[editIndex] = task; 
				setTasks(updatedTasks); 
				setEditIndex(-1); 
			} else { 
				// Add new task 
				setTasks([...tasks, task]); 
			} 
			setTask(""); 
		} 
	}; 

	const handleEditTask = (index) => { 
		const taskToEdit = tasks[index]; 
		setTask(taskToEdit); 
		setEditIndex(index); 
	}; 

	const handleDeleteTask = (index) => { 
		const updatedTasks = [...tasks]; 
		updatedTasks.splice(index, 1); 
		setTasks(updatedTasks); 
	}; 

	const renderItem = ({ item, index }) => ( 
		<View style={styles.task}> 
			<Text 
				style={styles.itemList}>{item}</Text> 
			<View 
				style={styles.taskButtons}> 
				<TouchableOpacity 
					onPress={() => handleEditTask(index)}> 
					<Text 
						style={styles.editButton}>EDIT</Text> 
				</TouchableOpacity> 
				<TouchableOpacity 
					onPress={() => handleDeleteTask(index)}> 
					<Text 
						style={styles.deleteButton}>DELETE</Text> 
				</TouchableOpacity> 
			</View> 
		</View> 
	); 

	return ( 
		<View style={styles.container}> 
			<Text style={styles.heading}>"REMINDERS"</Text> 
			<Text style={styles.title}>To Do List</Text> 
			<TextInput 
				style={styles.input} 
				placeholder="Enter task"
				value={task} 
				onChangeText={(text) => setTask(text)} 
			/> 
			<TouchableOpacity 
				style={styles.addButton} 
				onPress={handleAddTask}> 
				<Text style={styles.addButtonText}> 
					{editIndex !== -1 ? "Update Task" : "Add Task"} 
				</Text> 
			</TouchableOpacity> 
			<FlatList 
				data={tasks} 
				renderItem={renderItem} 
				keyExtractor={(item, index) => index.toString()} 
			/> 
		</View> 
	); 
}; 

const styles = StyleSheet.create({ 
	container: { 
		flex: 1, 
		padding: 40, 
		marginTop: 40, 
	}, 
	title: { 
		fontSize: 24, 
		fontWeight: "bold", 
    textAlign: "center",
		marginBottom: 20, 
    color: "#ED7D31",
	}, 
	heading: { 
		fontSize: 30, 
		fontWeight: "bold", 
    textAlign: "center",
		marginBottom: 7, 
		color: "#706233", 
	}, 
	input: { 
		borderWidth: 5, 
		borderColor: "#776B5D", 
		padding: 10, 
		marginBottom: 10, 
		borderRadius: 30, 
		fontSize: 20, 
	}, 
	addButton: { 
		backgroundColor: "#B0A695", 
		padding: 10, 
		borderRadius: 5, 
		marginBottom: 10, 
	}, 
	addButtonText: { 
		color: "white", 
		fontWeight: "bold", 
		textAlign: "center", 
		fontSize: 20, 
	}, 
	task: { 
		flexDirection: "row", 
		justifyContent: "space-between", 
		alignItems: "center", 
		marginBottom: 15, 
		fontSize: 20, 
	}, 
	itemList: { 
		fontSize: 21, 
	}, 
	taskButtons: { 
		flexDirection: "row", 
	}, 
	editButton: { 
		marginRight: 10, 
		color: "#E1C78F", 
		fontWeight: "bold", 
		fontSize: 20, 
	}, 
	deleteButton: { 
		color: "#B0926A", 
		fontWeight: "bold",  
		fontSize: 20, 
	}, 
}); 

export default App;