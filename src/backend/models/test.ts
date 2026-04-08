import UploadModel from './UploadModel'; // Adjust the path as needed

async function testGetAll() {
  console.log('--- Starting Database Test: getAll() ---');

  try {
    // 1. Call the static method
    const uploads = await UploadModel.getAll();

    // 2. Check if there is data
    if (uploads.length === 0) {
      console.warn('⚠️ No records found in the "submission" table.');
    } else {
      console.log(`✅ Successfully retrieved ${uploads.length} records:`);
      
      // console.table looks much better for DB results in the terminal!
      console.table(uploads);
    }
  } catch (error) {
    console.error('❌ Error fetching records:', error.message);
  } finally {
    // If your db config doesn't close the pool automatically, 
    // the process might hang. You may need to manually exit:
    process.exit();
  }
}

testGetAll();