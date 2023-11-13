import Command from "../models/Command.js";

const getListCommand = () => {
    Command.find({}, (err, commands) => {
        if (err) {
            console.error('Error retrieving commands:', err);
            return;
        }

        console.log('List of commands:');
        commands.forEach((command) => {
            console.log(command);
        });
    });
}
const findAnswerByQuestion = (command) => {
    const searchQuery = {
        $text: {
            $search: command,
            $searchPath: ["command"]
        }
    };
    Command.find(searchQuery).exec((err, commands) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Found commands:', commands);
    });
}

const createCommand = (command, answer) => {
    const newCommand = new Command({
        command,
        answer,
    });
    newCommand.save((err) => {
        if (err) {
            console.error('Error saving Command:', err);
            return;
        }

        console.log('Command saved successfully');
    });
}

const editCommand = (commandData) => {
    Command.findById(commandData._id, (err, command) => {
        if (err) {
            console.error('Error finding Command:', err);
            return;
        }

        if (!message) {
            console.error('Command not found');
            return;
        }
        command.command = commandData.command;
        command.question = commandData.question;
        command.save((err) => {
            if (err) {
                console.error('Error saving message:', err);
                return;
            }

            console.log('Command edited successfully');
        });
        // Edit the 'message' object here
    });
}

const deleteCommand = (commandId) => {
    Command.findByIdAndDelete(commandId, (err) => {
        if (err) {
            console.error('Error deleting command:', err);
            return;
        }
        console.log('Command deleted successfully');
    });
}

export { getListCommand, findAnswerByQuestion, createCommand, editCommand, deleteCommand }