const grunt = require('grunt')
// 随着gruntfile越来越复杂，grunt.loadNpmTasks的操作就越来越多，社区中有一个模块会减少grunt.loadNpmTasks的使用

// 引入插件
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
    grunt.initConfig({
        clean: {
            // 清除指定文件
            temp: 'dist'
        },
        sass: {
            options: {
                sourceMap: true,  //编译过程中自动生成对应的sourceMap文件
                implementation: sass //require导入的模块 //implementation指定在grunt-sass中使用哪个模块去处理sass编译
            },
            main: {
                files: {
                    'dist/assets/styles/main.css': 'src/assets/styles/main.scss'  // 输出路径:输入的原路径
                }
            }
        },
        // 注：babel转换的是ES新特性，这里转换部分特性时，presets把需要转换的特性打了一个包叫做presets，这里使用的叫env，根据最新的ES特性做对应的转换
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env'] // 将最新的ECMAScript特性全部加载进来
            },

            main: {
                files: {
                    'dist/assets/scripts/main.js': 'src/assets/scripts/main.js'
                }
            }
        },
        htmlmin: {
            options: {
                removeComments: false,                     // 去除注释信息 
                collapseWhitespace: true,                   // 去除空白字符  
                removeEmptyAttributes: true,            // 去除标签的空属性
                removeCommentsFromCDATA: true, // 去除 CDATA 的注释信息
                removeRedundantAttributes: true     // 去除标签的冗余属性
            },
            // 具体任务配置
            build: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.html',
                    dest: 'dist/'
                }]
            }
        },
        copy: {
            main: {
              src: ['public/**'],
              expand: true,
              dest: 'dist',
            }
        },
        watch: {
            js: {
                files: ['src/assets/scripts/*.js'],  //通配所有js文件的变化
                tasks: ['babel']  // 当文件变化后要执行什么任务
            },
            css: {
                files: ['src/assets/styles/*.scss'], //scss：sass最新的扩展名
                tasks: ['sass'] //sass最早的扩展名
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: 'src/assets/images/',   // 图片在imagemin目录下
                    src: ['**/*.{jpg,svg,png}'], // 优化 imagemin 目录下所有 png/jpg/jpeg 图片
                    dest: 'dist/assets/images/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                }]
            }
        }
    })

    //载入插件当中提供的任务
    // grunt.loadNpmTasks('grunt-contrib-clean')
    // grunt.loadNpmTasks('grunt-sass') 
    // grunt.loadNpmTasks('grunt-babel') 

    // 默认自动加载所有的grunt插件中的任务
    loadGruntTasks(grunt)

    // 此时不会立即执行babel和sass对应的任务，只有当文件发生变换才会执行对应的任务，所以一开始并不会直接执行对应任务，需要给watch做一个映射：
    // 启动的瞬间先执行一次编译操作，再启动监听
    grunt.registerTask('default', ['clean', 'sass', 'babel', 'copy', 'htmlmin',  'watch', 'imagemin'])
}

// ---> yarn grunt  