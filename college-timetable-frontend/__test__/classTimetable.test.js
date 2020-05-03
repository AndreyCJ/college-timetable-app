describe("Testing the timetable getTable", () => {

	it("tests the base route and returns true for status", async () => {

		const getTables = classes => {
      let monday = [];
      let tuesday = [];
      let wednesday = [];
      let thursday = [];
      let friday = [];
  
      classes.map(classData => {
        if (classData.day === 'Понедельник'){
          monday[classData.classNum - 1] = classData.className;
        } 
        else if (classData.day === 'Вторник') {
          tuesday[classData.classNum - 1] = classData.className;
        }
        else if (classData.day === 'Среда') {
          wednesday[classData.classNum - 1] = classData.className;
        }
        else if (classData.day === 'Четверг') {
          thursday[classData.classNum - 1] = classData.className;
        }
        else if (classData.day === 'Пятница') {
          friday[classData.classNum - 1] = classData.className;
        }
        return true;
      });
  
      const maxClassNum = Math.max(...classes.map(classesNum => classesNum.classNum));
      const classData = [];
  
      for (let i = 0; i < maxClassNum; i++) {
        classData.push([monday[i], tuesday[i], wednesday[i], thursday[i], friday[i]]);
      }

      return classData;
    };

    const data = [
      {"_id":"5e99507de80e814600c34021","day":"Понедельник","room":304,"week":"Четная","group":"П-43","className":"Технология разработки и защиты баз данных","__v":0,"classNum":1},
      {"_id":"5e99507de80e814600c34021","day":"Вторник","room":304,"week":"Четная","group":"П-43","className":"Документирование и сертификация","__v":0,"classNum":1},
      {"_id":"5e99507de80e814600c34021","day":"Понедельник","room":304,"week":"Четная","group":"П-43","className":"Математика","__v":0,"classNum":2},
    ];

		expect(getTables(data)).toEqual([
      [                                               // Первый урок
        'Технология разработки и защиты баз данных',  // <- Понедельник
        'Документирование и сертификация',            // <- Вторник
        undefined,                                    // <- Среда
        undefined,                                    // <- Четверг
        undefined                                     // <- Пятница
      ],
      [                                               // Второй урок
        'Математика',                                 // <- Понедельник
        undefined,                                    // <- Вторник
        undefined,                                    // <- Среда
        undefined,                                    // <- Четверг
        undefined                                     // <- Пятница
      ]
    ]);

	});

});