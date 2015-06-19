/*
 * 图片/文件上传
 * 参数：[上传按钮][添加目标][传输url][文件个数][预览宽度][预览高度][传输完成写入的节点]
 */
function addUpLoad(upload_btn,add_target,server,file_num,width,height,success_target){
	var uploader = WebUploader.create({

            // 选完文件后，是否自动上传。
            auto: true,

            // swf文件路径
            swf: '/public/plugin/webuploader/Uploader.swf',

            // 文件接收服务端。
            server: server,

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: upload_btn,

            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            
            fileNumLimit: file_num,
        });
        uploader.on( 'fileQueued', function( file ) {
            var $li = $(
                    '<div id="' + file.id + '" class="file-item thumbnail">' +
                        '<img>' +
                        '<div class="info">' + file.name + '</div>' +
                    '</div>'
                    ),
                $img = $li.find('img');
            
            // $list为容器jQuery实例
            $(add_target).empty();
            $(add_target).append( $li );

            // 创建缩略图
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100
			/*设置默认宽度高度*/
			if(!width) { width = 100;}
			if(!height) { height = 100;}
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }

                $img.attr( 'src', src );
            }, width, height );
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on( 'uploadProgress', function( file, percentage ) {
            var $li = $( '#'+file.id ),
                $percent = $li.find('.progress span');
            // 避免重复创建
            if ( !$percent.length ) {
                $percent = $('<p class="progress"><span></span></p>').appendTo( $li ).find('span');
            }
            $percent.css( 'width', percentage * 100 + '%' );
        });

        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on( 'uploadSuccess', function( file ,response) {
            console.log("返回的图片路径是："+response._raw);
			$(success_target).val(response._raw);
            /*$( '#'+file.id ).addClass('upload-state-done');*/
            $( '#'+file.id ).append("<i class='upload-state-done'></i>");
        });

        // 文件上传失败，显示上传出错。
        uploader.on( 'uploadError', function( file ) {
            var $li = $( '#'+file.id ),
                $error = $li.find('div.error');

            // 避免重复创建
            if ( !$error.length ) {
                $error = $('<div class="error"></div>').appendTo( $li );
            }

            $error.text('上传失败');
        });

        // 完成上传完了，成功或者失败，先删除进度条。
        uploader.on( 'uploadComplete', function( file ) {
            $( '#'+file.id ).find('.progress').remove();
        });
}

/*
 *
 */
function addFileUpload(upload_btn,add_target,server,file_num,width,height,success_target){
    var uploader = WebUploader.create({

            // 选完文件后，是否自动上传。
            auto: true,

            // swf文件路径
            swf: '/public/plugin/webuploader/Uploader.swf',

            // 文件接收服务端。
            server: server,

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: upload_btn,
            
            //上传文件个数
            fileNumLimit: file_num,
        });
        uploader.on( 'fileQueued', function( file ) {
            var $li = $(
                    '<div id="' + file.id + '" class="file-item thumbnail">' +
                        '<img>' +
                        '<div class="info">' + file.name + '</div>' +
                    '</div>'
                    ),
                $img = $li.find('img');
            
            // $list为容器jQuery实例
            $(add_target).empty();
            $(add_target).append( $li );
            
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on( 'uploadProgress', function( file, percentage ) {
            var $li = $( '#'+file.id ),
                $percent = $li.find('.progress span');
            // 避免重复创建
            if ( !$percent.length ) {
                $percent = $('<p class="progress"><span></span></p>').appendTo( $li ).find('span');
            }
            $percent.css( 'width', percentage * 100 + '%' );
        });

        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on( 'uploadSuccess', function( file ,response) {
            console.log("返回的图片路径是："+response._raw);
			$(success_target).val(response._raw);
            /*$( '#'+file.id ).addClass('upload-state-done');*/
            $( '#'+file.id ).append("<i class='upload-state-done'></i>");
        });

        // 文件上传失败，显示上传出错。
        uploader.on( 'uploadError', function( file ) {
            var $li = $( '#'+file.id ),
                $error = $li.find('div.error');

            // 避免重复创建
            if ( !$error.length ) {
                $error = $('<div class="error"></div>').appendTo( $li );
            }

            $error.text('上传失败');
        });

        // 完成上传完了，成功或者失败，先删除进度条。
        uploader.on( 'uploadComplete', function( file ) {
            $( '#'+file.id ).find('.progress').remove();
        });
}

