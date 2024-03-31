const sinon = require('sinon');
const PostModel = require('../models/quote.js');
const PostController = require('../routes/quote.js');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            registerID: '7K9bX3FoR2vYnDcGt5eA1sWaZuB4mHXJ',
            salesPerson: 'John Smith',
            date: Date.now(),
            client: 'Alice Alison',
            clientCompany: 'The Alison Group',
            clientEmail: 'sales@alisongroup.com',
            clientNumber: '0917 123 456',
            clientAddr: '123 Blossom Lane, Springville, Meadowland 56789. USA'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    
    describe('add', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('returns the created material', () => {
            // Arrange
            expectedResult = {
                registerID: '7K9bX3FoR2vYnDcGt5eA1sWaZuB4mHXJ',
                salesPerson: 'John Smith',
                date: Date.now(),
                client: 'Alice Alison',
                clientCompany: 'The Alison Group',
                clientEmail: 'sales@alisongroup.com',
                clientNumber: '0917 123 456',
                clientAddr: '123 Blossom Lane, Springville, Meadowland 56789. USA'
            };

            createPostStub = sinon.stub(PostModel, 'create').yields(null, expectedResult);

            // Act
            PostController.post(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.create, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('returns status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'create').yields(error);

            // Act
            PostController.post(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.create, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
    /*
    describe('update', () => {
        let req2 = {
            body: {
                registerID: '7K9bX3FoR2vYnDcGt5eA1sWaZuB4mHXJ',
                salesPerson: 'John Doe',
                date: Date.now(),
                client: 'John Wick',
                clientCompany: 'The Continental',
                clientEmail: 'sales@THEcontinental.com',
                clientNumber: '0917 123 456',
                clientAddr: 'Jose Rizal Street'
            }
        };
        var updatePostStub;

        beforeEach(() => {
            // before every test case setup
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            updatePostStub.restore();
        });

        it('returns the updated post object', () => {
            // Arrange
            expectedResult = {
                registerID: '7K9bX3FoR2vYnDcGt5eA1sWaZuB4mHXJ',
                salesPerson: 'John Smith',
                date: Date.now(),
                client: 'Alice Alison',
                clientCompany: 'The Alison Group',
                clientEmail: 'sales@alisongroup.com',
                clientNumber: '0917 123 456',
                clientAddr: '123 Blossom Lane, Springville, Meadowland 56789. USA'
            };

            createPostStub = sinon.stub(PostModel, 'create').yields(null, expectedResult);

            // Act
            PostController.addPost(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.create, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));


            // Arrange
            expectedResult2 = {
                registerID: '7K9bX3FoR2vYnDcGt5eA1sWaZuB4mHXJ',
                salesPerson: 'John Doe',
                date: Date.now(),
                client: 'John Wick',
                clientCompany: 'The Continental',
                clientEmail: 'sales@THEcontinental.com',
                clientNumber: '0917 123 456',
                clientAddr: 'Jose Rizal Street'
            };

            updatePostStub = sinon.stub(PostModel, 'update').yields(null, expectedResult2);

            // Act
            PostController.updatePost(req2, res);

            // Assert
            sinon.assert.calledWith(PostModel.update, req2.body)
            sinon.assert.calledWith(res.json, sinon.match({ id: req2.body.id }));
            sinon.assert.calledWith(res.json, sinon.match({ title: req2.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req2.body.content }));
        });

        // Error Scenario
        it('returns status 500 on server error', () => {
            updatePostStub = sinon.stub(PostModel, 'update').yields(error);

            // Act
            PostController.updatePost(req2, res);

            // Assert
            sinon.assert.calledWith(PostModel.update, req2.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
    
    describe('delete', () => {
        let req2 = {
            body: {
                registerID: '7K9bX3FoR2vYnDcGt5eA1sWaZuB4mHXJ',
                salesPerson: 'John Doe',
                date: Date.now(),
                client: 'John Wick',
                clientCompany: 'The Continental',
                clientEmail: 'sales@THEcontinental.com',
                clientNumber: '0917 123 456',
                clientAddr: 'Jose Rizal Street'
            }
        };
        var deletePostStub;

        beforeEach(() => {
            // before every test case setup
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            deletePostStub.restore();
        });

        it('returns the deleted post object', () => {
            // Arrange
            expectedResult1 = {
                registerID: '7K9bX3FoR2vYnDcGt5eA1sWaZuB4mHXJ',
                salesPerson: 'John Doe',
                date: Date.now(),
                client: 'John Wick',
                clientCompany: 'The Continental',
                clientEmail: 'sales@THEcontinental.com',
                clientNumber: '0917 123 456',
                clientAddr: 'Jose Rizal Street'
            };

            deletePostStub = sinon.stub(PostModel, 'delete').yields(null, expectedResult1);

            // Act
            PostController.deletePost(req2, res);

            // Assert
            sinon.assert.calledWith(PostModel.delete, req2.body.id);
            sinon.assert.calledWith(res.json, sinon.match({ title: req2.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req2.body.content }));
        });

        // Error Scenario
        it('returns status 500 on server error', () => {
            deletePostStub = sinon.stub(PostModel, 'delete').yields(error);

            // Act
            PostController.deletePost(req2, res);

            // Assert
            sinon.assert.calledWith(PostModel.delete, req2.body.id);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
    */
});