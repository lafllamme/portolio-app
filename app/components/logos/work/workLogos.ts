import abTastyLogo from '~/assets/logos/work/ab-tasty-logo-white.svg?raw'
import hotelbirdLogo from '~/assets/logos/work/hotelbird-logo-white.svg?raw'
import motelOneLogo from '~/assets/logos/work/motel-one-logo-white.svg?raw'
import storckLogo from '~/assets/logos/work/storck-logo-white.svg?raw'
import theCloudOneLogo from '~/assets/logos/work/the-cloud-one-logo-white.svg?raw'
import usercentricsLogo from '~/assets/logos/work/usercentrics-logo-white.svg?raw'
import veriskLogo from '~/assets/logos/work/verisk-logo-white.svg?raw'
import workmatrixLogo from '~/assets/logos/work/workmatrix-logo-white.svg?raw'
import yarowaLogo from '~/assets/logos/work/yarowa-logo-white.svg?raw'

export interface WorkLogoItem {
  alt: string
  company: string
  href: string
  imgClass: string
  title: string
  svg: string
  slotClass: string
  wrapperClass?: string
}

export const workLogosByCompany: Record<string, WorkLogoItem> = {
  'AB Tasty': {
    company: 'AB Tasty',
    svg: abTastyLogo,
    alt: 'AB Tasty logo',
    title: 'AB Tasty',
    href: 'https://www.abtasty.com/',
    slotClass: 'w-[172px] md:w-[196px]',
    imgClass: 'h-[34px] md:h-[38px]',
  },
  'Hotelbird': {
    company: 'Hotelbird',
    svg: hotelbirdLogo,
    alt: 'Hotelbird logo',
    title: 'Hotelbird',
    href: 'https://www.hotelbird.com/',
    slotClass: 'w-[186px] md:w-[214px]',
    imgClass: 'h-[24px] md:h-[32px]',
  },
  'Motel One': {
    company: 'Motel One',
    svg: motelOneLogo,
    alt: 'Motel One logo',
    title: 'Motel One',
    href: 'https://www.motel-one.com/en/',
    slotClass: 'w-[190px] md:w-[218px]',
    imgClass: 'h-[24px] md:h-[28px]',
  },
  'Storck': {
    company: 'Storck',
    svg: storckLogo,
    alt: 'Storck logo',
    title: 'Storck',
    href: 'https://www.storck.com/en',
    slotClass: 'w-[126px] md:w-[148px]',
    imgClass: 'h-[31px] md:h-[36px]',
  },
  'The Cloud One': {
    company: 'The Cloud One',
    svg: theCloudOneLogo,
    alt: 'The Cloud One Hotels logo',
    title: 'The Cloud One Hotels',
    href: 'https://www.the-cloud-one.com/en/',
    slotClass: 'w-[268px] md:w-[318px]',
    imgClass: 'h-[31px] md:h-[36px]',
  },
  'Usercentrics': {
    company: 'Usercentrics',
    svg: usercentricsLogo,
    alt: 'Usercentrics logo',
    title: 'Usercentrics',
    href: 'https://www.usercentrics.com/',
    slotClass: 'w-[196px] md:w-[228px]',
    imgClass: 'h-[28px] md:h-[32px]',
  },
  'Verisk': {
    company: 'Verisk',
    svg: veriskLogo,
    alt: 'Verisk logo',
    title: 'Verisk',
    href: 'https://www.verisk.com/',
    slotClass: 'w-[132px] md:w-[154px]',
    imgClass: 'h-[26px] md:h-[30px]',
  },
  'Workmatrix': {
    company: 'Workmatrix',
    svg: workmatrixLogo,
    alt: 'Workmatrix logo',
    title: 'Workmatrix',
    href: 'https://www.workmatrix.de/',
    slotClass: 'w-[178px] md:w-[206px]',
    imgClass: 'h-[18px] md:h-[21px]',
  },
  'Yarowa': {
    company: 'Yarowa',
    svg: yarowaLogo,
    alt: 'Yarowa logo',
    title: 'Yarowa',
    href: 'https://www.yarowa.com/deutsch-ch/home/',
    slotClass: 'w-[154px] md:w-[184px]',
    imgClass: 'h-[24px] md:h-[28px]',
  },
}
