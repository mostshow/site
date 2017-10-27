<?php
// 验证码类

class image {
    protected $im;
    protected $img_width;
    protected $img_height;
    protected $img_type;
    // 生成随机数
    static public function randStr($n = 4) {
        if($n <= 0) {
            return '';
        }
        $str = 'abcdefghijkmnpqrstuvwxyzABCDEFGHIJKMNPQRSTUVWXYZ123456789';
        $str = substr(str_shuffle($str),0,$n);
        return $str;
    }
    // 生成验证码
    static public function chkcode($w=60,$h=25) {
        $code = self::randStr(4);
		$_SESSION['verifycode'] = strtolower($code);  
        $im = imagecreatetruecolor($w,$h);
        $gray = imagecolorallocate($im,248,248,248);
        $blue = imagecolorallocate($im,27,102,159);
        imagefill($im,0,0,$gray);
        imagestring($im,5,10,5,$code,$blue);
        header('content-type: image/jpeg');
        imagejpeg($im);
    }
    static public function make_thumb($ori,$w=200,$h=200) {
        // 判断原图大小,如果原图比缩略还小,不必处理.

        // 读出大图当画布
        $info = self::getinfo($ori);
        if($info['func'] === false) {
            return false;
        }

        $createfunc = 'imagecreatefrom' . $info['func']; // 分析出读取大图所用的函数名.
        $src = $createfunc($ori);

        // 创建小画布,并把背景做成灰色
        $small = imagecreatetruecolor($w,$h);
        $gray = imagecolorallocate($small,255,255,255);
        imagefill($small,0,0,$gray);

        // 复制大图到小图
        $scale = min($w/$info['width'], $h/$info['height']); // 以更小的缩小比例为准,才能装下

        // 根据比例,算最终复制过去的块的大小.
        $realw = $info['width'] * $scale;
        $realh = $info['height'] * $scale;

        // 生成小图
        /*
        bool imagecopyresampled ( resource $dst_image , resource $src_image , int $dst_x , int $dst_y , int $src_x , int $src_y , int $dst_w , int $dst_h , int $src_w , int $src_h )
        */

        // 计算留白
        $lw = round(($w - $realw)/2); // 计算左侧留的宽度
        $lh = round(($h - $realh)/2); // 计算上部留的高度

        imagecopyresampled($small,$src,$lw,$lh,0,0,$realw,$realh,$info['width'],$info['height']);

        /*
        header('content-type: image/jpeg');
        imagejpeg($small);
        */

        // 计算小图片的存储路径
        $thumburl = str_replace('.','_thumb.',$ori);
        $imagefunc = 'image' . $info['func'];

        if($imagefunc($small,$thumburl)) {
            return str_replace(ROOT,'',$thumburl);
        } else {
            return false;
        }


    }

    static public function getinfo($ori) {
        $arr = getimagesize($ori);

        // 如果原始图片分析不出来,直接false
        if($arr === false) {
            return false;
        }
        
        $info = array();
        
        $info['width'] = $arr[0];
        $info['height'] = $arr[1];
        
        switch($arr[2]) {
            case 1:
            $info['func'] = 'gif';
            break;

            case 2:
            $info['func'] = 'jpeg';
            break;

            case 3:
            $info['func'] = 'png';
            break;

            case 6:
            $info['func'] = 'wbmp';
            break;

            default:
            $info['func'] = false;
        
        }

        return $info;
    }
}
?>