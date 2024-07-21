const { ModelsUpload } = require('../models/modelsUpload')

const newModelsUpload = new ModelsUpload()


const processData = async (req, res) => {

    try {

        res.status(200).json({ message: await newModelsUpload.processData() })

    } catch (error) {
        console.error('Erro ao processar requisição:', error);
        res.status(500).json({ error: 'Erro ao processar requisição' });
    }
}

module.exports = {processData}