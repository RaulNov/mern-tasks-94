import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await connect(`${process.env.DB_MONGO}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;